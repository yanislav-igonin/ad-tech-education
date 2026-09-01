-- Разворачивает маркеры [^g-id] в главах в настоящие сноски.
-- Контент сносок берётся из глоссария — единого источника определений.
-- Путь к глоссарию передаётся переменной окружения GLOSSARY.
--
-- Разметка термина в глоссарии:
--   ### Название термина {#g-id}
--   Первый абзац — определение (уходит в сноску).
--   Остальные блоки (примеры и т.д.) — только на странице глоссария.

local glossaryPath = os.getenv("GLOSSARY")
      or error("glossary.lua: задайте путь к глоссарию в переменной окружения GLOSSARY")

-- Заголовок термина:  ### Название {#g-id}
-- Определение — первая непустая строка после заголовка.
local function loadTerms(path)
  local fh = io.open(path, "r")
  if not fh then
    error("glossary.lua: не удалось открыть глоссарий: " .. tostring(path))
  end
  local text = fh:read("*a")
  fh:close()
  local result = {}
  local id, title = nil, nil
  for line in text:gmatch("[^\r\n]+") do
    local h, termId = line:match("^###%s+(.-)%s*%{#g%-([%w%-]+)%}%s*$")
    if h then
      id, title = termId, h
    elseif line:match("^#") then
      id, title = nil, nil
    elseif id and not result[id] and line:match("%S") then
      local para = pandoc.read(line, "markdown").blocks[1]
      if not para or para.t ~= "Para" then
        error("glossary.lua: термин g-" .. id .. " без абзаца-определения")
      end
      result[id] = { title = title, inlines = para.content }
      id, title = nil, nil
    end
  end
  return result
end

local marker = "%[%^g%-([%w%-]+)%]"

local terms = loadTerms(glossaryPath)

local function expand(text)
  local out = {}
  local init = 1
  while true do
    local a, b, id = text:find(marker, init)
    if not a then
      break
    end
    local term = terms[id]
    if term then
      out[#out + 1] = pandoc.Note({ pandoc.Para(term.inlines) })
    else
      -- Неизвестный id остаётся текстом — его видно в выводе и легко заметить.
      out[#out + 1] = pandoc.Str(text:sub(a, b))
    end
    init = b + 1
  end
  if #out == 0 then
    return nil
  end
  if init <= #text then
    out[#out + 1] = pandoc.Str(text:sub(init))
  end
  return out
end

function Str(el)
  if not terms or not el.text:find(marker) then
    return nil
  end
  return expand(el.text)
end

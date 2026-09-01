CHAPTERS := $(sort $(wildcard chapters/ru/*.md))
GLOSSARY := glossary.md
GLOSSARY_FILTER := filters/glossary.lua
DL := site/public/downloads
EPUB := $(DL)/adtech-ru.epub
PDF := $(DL)/adtech-ru.pdf

.PHONY: epub pdf artifacts clean

epub: $(EPUB)
pdf: $(PDF)
artifacts: epub pdf

$(DL):
	mkdir -p $(DL)

$(EPUB): $(CHAPTERS) $(GLOSSARY) $(GLOSSARY_FILTER) | $(DL)
	GLOSSARY=$(CURDIR)/$(GLOSSARY) pandoc \
		--from=markdown+yaml_metadata_block \
		--to=epub3 \
		--toc \
		--split-level=1 \
		--metadata lang=ru \
		--metadata title="AdTech Education Materials" \
		$(CHAPTERS) \
		$(GLOSSARY) \
		--lua-filter=$(GLOSSARY_FILTER) \
		-o $@

$(PDF): $(CHAPTERS) $(GLOSSARY) $(GLOSSARY_FILTER) site/scripts/print.css
	cd site && GLOSSARY=$(CURDIR)/$(GLOSSARY) node scripts/build-pdf.mjs

clean:
	rm -rf build $(DL)

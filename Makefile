CHAPTERS_RU := $(sort $(wildcard chapters/ru/*.md))
CHAPTERS_EN := $(sort $(wildcard chapters/en/*.md))
GLOSSARY_RU := glossary.md
GLOSSARY_EN := glossary.en.md
GLOSSARY_FILTER := filters/glossary.lua
DL := site/public/downloads
EPUB_RU := $(DL)/adtech-ru.epub
PDF_RU := $(DL)/adtech-ru.pdf
EPUB_EN := $(DL)/adtech-en.epub
PDF_EN := $(DL)/adtech-en.pdf

.PHONY: epub pdf artifacts epub-en pdf-en artifacts-en clean

epub: $(EPUB_RU)
pdf: $(PDF_RU)
artifacts: epub pdf
epub-en: $(EPUB_EN)
pdf-en: $(PDF_EN)
artifacts-en: epub-en pdf-en

$(DL):
	mkdir -p $(DL)

$(EPUB_RU): $(CHAPTERS_RU) $(GLOSSARY_RU) $(GLOSSARY_FILTER) | $(DL)
	GLOSSARY=$(CURDIR)/$(GLOSSARY_RU) pandoc \
		--from=markdown+yaml_metadata_block \
		--to=epub3 \
		--toc \
		--split-level=1 \
		--metadata lang=ru \
		--metadata title="AdTech Education Materials" \
		$(CHAPTERS_RU) \
		$(GLOSSARY_RU) \
		--lua-filter=$(GLOSSARY_FILTER) \
		-o $@

$(EPUB_EN): $(CHAPTERS_EN) $(GLOSSARY_EN) $(GLOSSARY_FILTER) | $(DL)
	GLOSSARY=$(CURDIR)/$(GLOSSARY_EN) pandoc \
		--from=markdown+yaml_metadata_block \
		--to=epub3 \
		--toc \
		--split-level=1 \
		--metadata lang=en \
		--metadata title="AdTech: How Advertising Technology Works" \
		$(CHAPTERS_EN) \
		$(GLOSSARY_EN) \
		--lua-filter=$(GLOSSARY_FILTER) \
		-o $@

$(PDF_RU): $(CHAPTERS_RU) $(GLOSSARY_RU) $(GLOSSARY_FILTER) site/scripts/print.css
	cd site && GLOSSARY=$(CURDIR)/$(GLOSSARY_RU) node scripts/build-pdf.mjs ru

$(PDF_EN): $(CHAPTERS_EN) $(GLOSSARY_EN) $(GLOSSARY_FILTER) site/scripts/print.css
	cd site && GLOSSARY=$(CURDIR)/$(GLOSSARY_EN) node scripts/build-pdf.mjs en

clean:
	rm -rf build $(DL)

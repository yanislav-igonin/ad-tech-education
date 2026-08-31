CHAPTERS := $(sort $(wildcard chapters/ru/*.md))
DL := site/public/downloads
EPUB := $(DL)/adtech-ru.epub
PDF := $(DL)/adtech-ru.pdf

.PHONY: epub pdf artifacts clean

epub: $(EPUB)
pdf: $(PDF)
artifacts: epub pdf

$(DL):
	mkdir -p $(DL)

$(EPUB): $(CHAPTERS) | $(DL)
	pandoc \
		--from=markdown+yaml_metadata_block \
		--to=epub3 \
		--toc \
		--split-level=1 \
		--metadata lang=ru \
		--metadata title="AdTech Education Materials" \
		$(CHAPTERS) \
		-o $@

$(PDF): $(CHAPTERS) site/scripts/print.css
	cd site && node scripts/build-pdf.mjs

clean:
	rm -rf build $(DL)

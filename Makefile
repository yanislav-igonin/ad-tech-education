.PHONY: epub

EPUB := build/adtech-ru.epub
CHAPTERS := \
	chapters/ru/01-what-is-adtech.md \
	chapters/ru/02-adtech-ecosystem-participants.md

epub:
	mkdir -p build
	pandoc \
		--from=markdown+yaml_metadata_block \
		--to=epub3 \
		--toc \
		--split-level=1 \
		--metadata lang=ru \
		--metadata title="AdTech Education Materials" \
		$(CHAPTERS) \
		-o $(EPUB)

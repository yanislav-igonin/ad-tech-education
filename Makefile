.PHONY: epub

EPUB := build/adtech-ru.epub
CHAPTERS := \
	chapters/ru/01-what-is-adtech.md \
	chapters/ru/02-adtech-ecosystem-participants.md \
	chapters/ru/03-core-advertising-metrics.md \
	chapters/ru/04-adtech-economics-business-models.md

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

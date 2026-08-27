epub:
	pandoc \
  --from=markdown+yaml_metadata_block \
  --to=epub3 \
  --toc \
  --epub-chapter-level=1 \
  --metadata lang=ru \
  chapters/ru/01-what-is-adtech.md \
  -o build/adtech-chapter-01.epub

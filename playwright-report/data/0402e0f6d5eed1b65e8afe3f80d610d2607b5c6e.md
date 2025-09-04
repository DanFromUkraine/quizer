# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - img [ref=e5]
      - generic [ref=e11]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /main
          - img [ref=e13] [cursor=pointer]
        - link [ref=e15] [cursor=pointer]:
          - /url: /main/history
          - img [ref=e16] [cursor=pointer]
        - link [ref=e18] [cursor=pointer]:
          - /url: /main/add-collection
          - img [ref=e19] [cursor=pointer]
    - main [ref=e22]:
      - heading "Мої колекції" [level=1] [ref=e24]
      - link "some collection title" [ref=e27] [cursor=pointer]:
        - /url: main/play-offline?id=some+collection+title=
        - heading "some collection title" [level=3] [ref=e30] [cursor=pointer]
  - alert [ref=e31]: Мої колекції
  - button "Open Next.js Dev Tools" [ref=e37] [cursor=pointer]:
    - img [ref=e38] [cursor=pointer]
```
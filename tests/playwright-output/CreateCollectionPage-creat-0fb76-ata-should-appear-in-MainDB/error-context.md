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
      - link [ref=e27] [cursor=pointer]:
        - /url: main/play-offline?id=
        - generic [ref=e29] [cursor=pointer]:
          - heading [level=3]
  - alert [ref=e30]: Мої колекції
  - generic [ref=e35] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e36] [cursor=pointer]:
      - img [ref=e37] [cursor=pointer]
    - generic [ref=e40] [cursor=pointer]:
      - button "Open issues overlay" [ref=e41] [cursor=pointer]:
        - generic [ref=e42] [cursor=pointer]:
          - generic [ref=e43] [cursor=pointer]: "0"
          - generic [ref=e44] [cursor=pointer]: "1"
        - generic [ref=e45] [cursor=pointer]: Issue
      - button "Collapse issues badge" [ref=e46] [cursor=pointer]:
        - img [ref=e47] [cursor=pointer]
```
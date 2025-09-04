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
      - generic [ref=e24]:
        - textbox "Enter heading" [ref=e25]
        - button "Зберегти" [ref=e26]
      - button "Edit cards as a text" [ref=e29]
      - generic [ref=e32]:
        - generic [ref=e33]:
          - paragraph [ref=e34]: №1
          - img [ref=e35]
        - textbox "Enter text" [ref=e37]
        - button "Add option" [ref=e39]
      - button "Add card Ctrl + M" [ref=e41]:
        - paragraph [ref=e42]: Add card
        - generic [ref=e43]:
          - paragraph [ref=e44]: Ctrl
          - text: +
          - paragraph [ref=e45]: M
  - alert [ref=e46]
  - button "Open Next.js Dev Tools" [ref=e52] [cursor=pointer]:
    - img [ref=e53] [cursor=pointer]
```
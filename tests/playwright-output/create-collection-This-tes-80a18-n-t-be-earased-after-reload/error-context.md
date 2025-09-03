# Page snapshot

```yaml
- generic [ref=e1]:
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
            - button "Add card Ctrl + M" [active] [ref=e31]:
                - paragraph [ref=e32]: Add card
                - generic [ref=e33]:
                    - paragraph [ref=e34]: Ctrl
                    - text: +
                    - paragraph [ref=e35]: M
    - alert [ref=e36]
    - button "Open Next.js Dev Tools" [ref=e42] [cursor=pointer]:
        - img [ref=e43] [cursor=pointer]
```

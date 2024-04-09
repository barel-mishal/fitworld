import { $, component$, useContext, useStore } from '@builder.io/qwik';
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { contextDashboard } from '~/components/layout_blocks/dashboard_layout_components/dashboard';
import { Button } from '~/components/ui/button/button';
import { Textarea } from '~/components/ui/textarea/textarea';

export const useFetchMarkdownFile = routeLoader$(async () => {
  const res = String.raw`
  # Markdown Example
  __Advertisement :)__
  
  - __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
    resize in browser.
  - __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
    i18n with plurals support and easy syntax.
  
  You will like those projects!
  
  ---
  
  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading
  
  
  ## Horizontal Rules
  
  ___
  
  ---
  
  ***
  
  
  ## Typographic replacements
  
  Enable typographer option to see result.
  
  (c) (C) (r) (R) (tm) (TM) (p) (P) +-
  
  test.. test... test..... test?..... test!....
  
  !!!!!! ???? ,,  -- ---
  
  "Smartypants, double quotes" and 'single quotes'
  
  
  ## Emphasis
  
  **This is bold text**
  
  __This is bold text__
  
  *This is italic text*
  
  _This is italic text_
  
  ~~Strikethrough~~
  
  
  ## Blockquotes
  
  
  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.
  
  
  ## Lists
  
  Unordered
  
  + Create a list by starting a line with \`+\`, \`-\`, or \`*\`
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet
      - Nulla volutpat aliquam velit
  + Very easy!
  
  Ordered
  
  1. Lorem ipsum dolor sit amet
  2. Consectetur adipiscing elit
  3. Integer molestie lorem at massa
  
  
  1. You can use sequential numbers...
  1. ...or keep all the numbers as \`1.\`
  
  Start numbering with offset:
  
  57. foo
  1. bar
  
  
  ## Code
  
  Inline \`code\`
  
  Indented code
  
      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code
  
  
  Block code "fences"
  
  \`\`\`
  Sample text here...
  \`\`\`
  
  Syntax highlighting
  
  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };
  
  console.log(foo(5));
  \`\`\`
  
  ## Tables
  
  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |
  
  Right aligned columns
  
  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |
  
  
  ## Links
  
  [link text](http://dev.nodeca.com)
  
  [link with title](http://nodeca.github.io/pica/demo/ "title text!")
  
  Autoconverted link https://github.com/nodeca/pica (enable linkify to see)
  
  
  ## Images
  
  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
  
  Like links, Images also have a footnote style syntax
  
  ![Alt text][id]
  
  With a reference later in the document defining the URL location:
  
  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
  
  
  ## Plugins
  
  The killer feature of \`markdown-it\` is very effective support of
  [syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).
  
  
  ### [Emojies](https://github.com/markdown-it/markdown-it-emoji)
  
  > Classic markup: :wink: :cry: :laughing: :yum:
  >
  > Shortcuts (emoticons): :-) :-( 8-) ;)
  
  see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.
  
  
  ### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)
  
  - 19^th^
  - H~2~O
  
  
  ### [\<ins>](https://github.com/markdown-it/markdown-it-ins)
  
  ++Inserted text++
  
  
  ### [\<mark>](https://github.com/markdown-it/markdown-it-mark)
  
  ==Marked text==
  
  
  ### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)
  
  Footnote 1 link[^first].
  
  Footnote 2 link[^second].
  
  Inline footnote^[Text of inline footnote] definition.
  
  Duplicated footnote reference[^second].
  
  [^first]: Footnote **can have markup**
  
      and multiple paragraphs.
  
  [^second]: Footnote text.
  
  
  ### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)
  
  Term 1
  
  :   Definition 1
  with lazy continuation.
  
  Term 2 with *inline markup*
  
  :   Definition 2
  
          { some code, part of Definition 2 }
  
      Third paragraph of definition 2.
  
  _Compact style:_
  
  Term 1
    ~ Definition 1
  
  Term 2
    ~ Definition 2a
    ~ Definition 2b
  
  
  ### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)
  
  This is HTML abbreviation example.
  
  It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.
  
  *[HTML]: Hyper Text Markup Language
  
  ### [Custom containers](https://github.com/markdown-it/markdown-it-container)
  
  ::: warning
  *here be dragons*
  :::
  `;
  const text = res
  const parsedMarkdown = await marked.parse(text);
  const sanitisedMarkdown = DOMPurify.sanitize(parsedMarkdown);
  return sanitisedMarkdown;
});

export default component$(() => {
  const store = useStore({
    content: "", 
    edit: true, 
    textEdit: $(function (this: {edit: boolean}) {
      return this.edit ? "Save" : "Edit";
    }),
    toggleEdit: $(function (this: {edit: boolean}) {
      this.edit = !this.edit;
    })
  });
  
  const dashboardContext = useContext(contextDashboard);

  const parsedMarkdown = () => {
    const parsedMarkdown = marked.parse(store.content) as string;
    const sanitisedMarkdown = DOMPurify.sanitize(parsedMarkdown);
    console.log(sanitisedMarkdown);
    return sanitisedMarkdown;
  }
  return (
    <div class="flex gap-2  ">
      <aside class="w-[200px] border-r p-4 gap-6 flex flex-col">
        <h1 class="font-bold text-3xl">Notes</h1>
        <ul class="grid gap-1">
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
          <li><Link class={[
            "grid p-2 hover:bg-sky-100 transition-all duration-200 rounded-md border border-sky-100"
          ]} href="/dashboard">Dashboard</Link></li>
        </ul>
      </aside>
      <section class={"flex overflow-y-auto flex-grow justify-center"} style={{height: `${dashboardContext.value.height}px`}}>
        <div class="">
          {store.edit ? <Textarea onInput$={(e, el) => store.content = el.value}></Textarea> : 
          <div 
          contentEditable='inherit' class="prose max-w-[600px] px-14 py-12 border" 
          dangerouslySetInnerHTML={parsedMarkdown()} ></div>}

          <Button onClick$={() => store.toggleEdit()}>{store.textEdit()}</Button>
        </div>
      </section>
    </div>
  );
});





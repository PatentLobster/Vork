<template>
  <div class="editor-container" :style="{width:cW,height:cH}">
    <slot></slot>
    <div ref="editor" :class="className" :style="{width:cW,height:cH}"></div>
  </div>
</template>

<script>
import ace from "brace";
require('brace/ext/language_tools.js');
export default {
  name: "Editor",
  props: {
    lang: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "solarized_dark"
    },
    fontSize: {
      type: Number,
      default: 12
    },
    content: {
      type: String,
      default: ""
    },
    width: {
      type: [String,Number],
      default: "100%"
    },
    height: {
      type: [String,Number],
      default: "100%"
    },
    className: {
      type: String,
      default: "ace-editor"
    },
    options: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      session: null
    };
  },
  computed: {
    cH() {
      if (typeof this.height === "number") return this.height + "px";
      if (typeof this.height === "string") return this.height;
      return "";
    },
    cW() {
      if (typeof this.width === "number") return this.width + "px";
      if (typeof this.width === "string") return this.width;
      return "";
    }
  },
  methods: {
    init() {

      this.editor = ace.edit(this.$refs.editor);

      this.editor.$blockScrolling = Infinity;
      this.session = this.editor.getSession();
      this.$emit("init", this.editor);
      this.setMode();
      this.setTheme();
      this.setFontSize();
      this.setOptions();
      this.setValue();
      this.setReadonly();
      this.editor.on("focus", this.onFocus);
      this.editor.on("blur", this.onBlur);
      this.editor.on("copy", this.onCopy);
      this.editor.on("paste", this.onPaste);
      this.editor.on("change", this.onChange);
      this.editor.on("input", this.onInput);
      this.prettify();
    },
    setMode() {
      require(`brace/mode/${this.lang}`);
      this.session.setMode(`ace/mode/${this.lang}`);
      return this.editor;
    },
    prettify() {
      require(`brace/ext/beautify`);
      // let beautify = ace.acequire("ace/ext/beautify");
      // b.beautify(this.editor);
      ace.acequire("ace/ext/beautify");
      // this.editor.beautify(this.session);
      // console.log(b);?
      this.session.beautify();
      return this.editor;
    },
    setTheme() {
      require(`brace/theme/${this.theme}`);
      // this.editor.setTheme(`ace/theme/${this.theme}`);
      this.editor.setTheme(`ace/theme/${this.theme}`);
      return this.editor;
    },
    setFontSize() {
      this.editor.setFontSize(this.fontSize);
      return this.editor;
    },
    setValue() {
      this.session.setValue(this.content);
      return this.editor;
    },
    getValue() {
      return this.editor.getValue();
    },
    setOptions() {
      this.editor.setOptions(this.options);
      return this.editor;
    },
    setReadonly() {
      this.editor.setReadOnly(this.readonly);
      return this.editor;
    },
    setCompleteData(data) {
      require('brace/ext/language_tools.js');
      ace.acequire("ace/ext/language_tools").addCompleter({
        getCompletions: function(editor, session, pos, prefix, callback) {
          return callback(null, data);
        }
      });
    },
    setAutocomplete() {
      this.editor.execCommand("startAutocomplete");
      return this.editor;
    },
    getRowCol() {
      return this.editor.selection.getCursor();
    },
    onFocus() {
      this.$emit("onFocus", this.editor);
    },
    onBlur() {
      this.$emit("onBlur", this.editor);
    },
    onChange() {
      this.$emit("onChange", this.editor);
    },
    onInput() {
      this.$emit("onInput", this.editor);
    },
    onCopy() {
      this.$emit("onCopy", this.editor);
    },
    onPaste() {
      this.$emit("onPaste", this.editor);
    },
    resize() {
      this.editor.resize();
      return this.editor;
    },
    setRange(startRow, startCol, endRow, endCol) {
      let Range = ace.acequire("ace/range").Range;
      return new Range(startRow, startCol, endRow, endCol);
    },
    /**
     * @param(r) type:new Range()
     */
    getTextRange(r) {
      return this.session.getTextRange(r);
    },
    save(storageName) {
      localStorage[storageName] = this.getValue();
      this.session.getUndoManager().markClean();
      return this.editor;
    },
    undo() {
      this.editor.undo();
      return this.editor;
    },
    redo() {
      this.editor.redo();
      return this.editor;
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy: function() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  watch: {
    fontSize() {
      this.setFontSize();
    },
    content() {
      this.setValue();
    },
    theme() {
      this.setTheme();
    },
    lang() {
      this.setMode();
    },
    height() {
      this.$nextTick(() => {
        this.resize();
      });
    },
    width() {
      this.$nextTick(() => {
        this.resize();
      });
    }
  }
};
</script>

<style scoped>

</style>
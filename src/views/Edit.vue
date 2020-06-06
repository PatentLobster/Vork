<template>
    <h1>{{content}}</h1>
    <div v-html="content"></div>
    <Editor
            height="300px"
            ref="editor"
            :content="firstContent"
            :options="{
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize:2
    }"
            :fontSize='14'
            :lang="'javascript'"
            :theme="'dark'"
            @onChange="editorChange"
            @init="editorInit">

    </Editor>
</template>

<script>
    import Editor from "@/components/Editor";
    export default {
        name: "Edit",
        components: {
          Editor
        },
        data() {
            return {
                firstContent: "Hello",
                content: ""
            };
        },
        methods: {
            editorChange(editor) {
                this.content = editor.getValue();
                console.log("changed", editor.getValue());
            },
            editorInput(editor) {
                this.content = editor.getValue();
                console.log("input", editor.getValue());
            },
            editorFocus(editor) {
                console.log("focus", editor);
            },
            editorBlur(editor) {
                console.log("blur", editor);
            },
            editorPaste(editor) {
                console.log("pase", editor);
            }
        }
    }
</script>

<style scoped>

</style>
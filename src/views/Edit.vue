<template>
    <div>
    <Editor
            height="600px"
            ref="editor"
            :content="JSON.stringify(days,null, '\t')"
            :options="{
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize:2
    }"
            :fontSize='14'
            lang="json"
            @onChange="editorChange">
    </Editor>
    </div>
</template>

<script>
    import Editor from "@/components/Editor";
    import {mapActions, mapState} from "vuex";
    import types from "@/store/types";
    export default {
        name: "Edit",
        components: {
          Editor
        },
        computed: {
            ...mapState([
                'days',
            ]),
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
            },
            ...mapActions([
                types.FETCH_ALL_DAYS,
            ]),
        },
        created() {
            this.FETCH_ALL_DAYS();
        },
    }
</script>

<style scoped>

</style>
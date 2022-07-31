import { InterfaceConfig } from "@directus/shared/types";
import InterfaceGroupModal from "./interface.vue";

export default {
  id: "print-group",
  name: "Print Group",
  description: "Group fields into modal dialog, accessible from a button",
  icon: "print",
  component: InterfaceGroupModal,
  hideLabel: true,
  hideLoader: true,
  types: ["alias"],
  localTypes: ["group"],
  group: "group",
  options: (context) => [
    {
      field: "title",
      type: "string",
      name: "$t:title",
      meta: {
        width: "full",
        interface: "system-display-template",
        required: true,
        options: {
          collectionName: context.collection,
          font: "monospace",
          placeholder: "$t:interfaces.boolean.label_placeholder",
        },
      },
    },
    {
      field: "headerIcon",
      name: "$t:interfaces.group-detail.header_icon",
      type: "string",
      meta: {
        interface: "select-icon",
        width: "half",
      },
    },
    {
      field: "headerColor",
      name: "$t:interfaces.group-detail.header_color",
      type: "string",
      meta: {
        width: "half",
        interface: "select-dropdown",
        default_value: "",
        options: {
          choices: [
            { text: "$t:primary", value: "primary" },
            { text: "$t:normal", value: "secondary" },
            { text: "$t:info", value: "info" },
            { text: "$t:success", value: "success" },
            { text: "$t:warning", value: "warning" },
            { text: "$t:danger", value: "danger" },
          ],
        },
      },
      schema: {
        default_value: "",
      },
    },
    {
      field: "lineNumber",
      name: "$t:interfaces.input-code.line_number",
      type: "boolean",
      meta: {
        width: "half",
        interface: "boolean",
      },
      schema: {
        default_value: true,
      },
    },
    {
      field: "lineWrapping",
      name: "$t:interfaces.input-code.line_wrapping",
      type: "boolean",
      meta: {
        width: "half",
        interface: "boolean",
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: "header",
      name: "$t:header",
      type: "json",

      meta: {
        interface: "extension-editorjs",
        width: "full",
        default_value: "",
      },
      schema: {
        default_value: "",
      },
    },
    {
      field: "customCss",
      name: "$t:Custom Css",
      type: "text",

      meta: {
        interface: "input-code",
        width: "full",
        default_value: "",

        template: "vvvv",
        options: { lineNumber: true, language: "css", lineWrapping: true },
      },
      schema: {
        default_value: "",
      },
    },
  ],
} as InterfaceConfig;

// {
//   field: "file",
//   name: "$t:interfaces.file.description",
//   type: "uuid",
//   meta: {
//     width: "full",
//     interface: "file",
//     note: "$t:interfaces.system-folder.field_hint",
//     default_value: "",
//   },
//   schema: {
//     default_value: "",
//   },
// },

// {
//   field: "layout",
//   name: "$t:layout_setup",
//   type: "string",
//   meta: {
//     width: "full",
//     interface: "select-dropdown",
//     default_value: "modal",
//     options: {
//       choices: [
//         { text: "modal", value: "modal" },
//         { text: "$t:sidebar", value: "sidebar" },
//       ],
//     },
//   },
//   schema: {
//     default_value: "modal",
//   },
// },

<template>
  <div class="group-modal">
    <vue-easy-print
      ref="easyPrint"
      tableShow
      class="easyPrint"
      media="print"
      :customCss="customCss"
      buttonShow="true"
      title="groupTitle"
    >
      <span class="print-header" v-html="htmlString"></span>
      <v-form
        :initial-values="initialValues"
        :fields="fields"
        :model-value="values"
        :primary-key="primaryKey"
        :group="field.meta?.field"
        :validation-errors="validationErrors"
        :loading="loading"
        :batch-mode="batchMode"
        @update:model-value="$emit('apply', $event)"
        @change="log"
        class="v-form"
      />
    </vue-easy-print>

    <v-button @click="print" class="trigger-button" :class="headerColor">
      <v-icon v-if="headerIcon" :name="headerIcon" left :disabled="disabled" />
      {{ groupTitle }}
    </v-button>
    <v-button @click="log" class="trigger-button" :class="headerColor">
      log
    </v-button>
  </div>
</template>

<script lang="ts">
import vueEasyPrint from "./vue-easy-print.vue";

import { Field } from "@directus/shared/types";
import { defineComponent, PropType, ref, computed, inject, watch } from "vue";
import { ValidationError } from "@directus/shared/types";
import { render } from "micromustache";
import { useI18n } from "vue-i18n";
import useDirectusToken from "./use-directus-token";
import { useApi } from "@directus/extensions-sdk";
// Import the package
import edjsHTML from "editorjs-html";

export default defineComponent({
  components: {
    vueEasyPrint,
  },
  name: "InterfaceGroupDetail",
  props: {
    field: {
      type: Object as PropType<Field>,
      required: true,
    },
    fields: {
      type: Array as PropType<Field[]>,
      required: true,
    },
    values: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    initialValues: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    batchMode: {
      type: Boolean,
      default: false,
    },
    batchActiveFields: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    primaryKey: {
      type: [Number, String],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    validationErrors: {
      type: Array as PropType<ValidationError[]>,
      default: () => [],
    },
    layout: {
      type: String as PropType<"modal" | "sidebar">,
      default: "sidebar",
    },
    title: {
      type: String,
      default: null,
    },
    headerIcon: {
      type: String,
      default: null,
    },
    headerColor: {
      type: String as PropType<
        "primary" | "secondary" | "info" | "success" | "warning" | "danger"
      >,
      default: "primary",
    },
    customCss: {
      type: String,
      default: "",
    },
    header: {
      type: String,
      default: "",
    },
  },
  emits: ["apply"],
  setup(props) {
    const { t } = useI18n();
    const internalActive = ref<boolean>(false);
    const values = inject("values", ref<Record<string, any>>({}));
    const groupTitle = computed<string>(() => {
      if (!props.title) return props.field.name;
      return render(props.title, values.value);
    });

    const api = useApi();
    const { addTokenToURL } = useDirectusToken(api);
    var edjsParser = edjsHTML();
    var customImageParser = edjsHTML({ image: imageParseToken });
    // console.log(edjsParser.parseStrict(props.header));

    let htmlString = "";
    // let parser = new DOMParser();
    // let doc;
    console.log(props.header.blocks);

    props.header.blocks.forEach((block) => {
      if (block.type == "image") {
        block.data.file.url;

        console.log(customImageParser.parseBlock(block));
        console.log(`vvvvvvvvvvvvvvv     ${block.data.file.url}`);
        htmlString += customImageParser.parseBlock(block);
      } else {
        htmlString += edjsParser.parseBlock(block);
      }
      console.log(htmlString);
    });

    // Parse this block in editorjs-html
    function imageParseToken(block) {
      return `<img   src= ${addTokenToURL(block.data.file.url, null)}></img>`;
    }

    return {
      t,
      groupTitle,
      internalActive,
      htmlString,
    };
  },

  methods: {
    // Pass it during the initialization step.

    print() {
      vueEasyPrint.beforePrint = () => {
        this.$refs.easyPrint.swapInput();
      };

      this.$refs.easyPrint.print();
    },
    // print(props):  // Print dom The content of

    log: function () {
      console.log("########################");

      // this.$refs.easyPrint.swapInputToDiv();
      console.log(edjsParser.parseStrict(this.header));
      ` :initial-values="initialValues"
          :fields="fields"
          :model-value="values"
          :primary-key="primaryKey"
          :group="field.meta.field"
          :validation-errors="validationErrors"
          :loading="loading"`;

      return false;
    },
  },
});
</script>

<style scoped>
p.swapinputval {
  display: none !important;
}
.print-header {
  display: none;
}
.trigger-button {
  padding-top: 24px;
}
.trigger-button.info {
  --v-button-background-color: var(--blue);
  --v-button-background-color-hover: var(--blue-125);
  --v-button-color: var(--blue-alt);
  --v-button-color-hover: var(--blue-alt);
}

.trigger-button.success {
  --v-button-background-color: #e700fc;
  /* --v-button-background-color: var(--success); */
  --v-button-background-color-hover: var(--success-125);
  --v-button-color: var(--success-alt);
  --v-button-color-hover: var(--success-alt);
}

.trigger-button.warning {
  --v-button-background-color: var(--warning);
  --v-button-background-color-hover: var(--warning-125);
  --v-button-color: var(--warning-alt);
  --v-button-color-hover: var(--warning-alt);
}

.trigger-button.danger {
  --v-button-icon-color: var(--white);
  --v-button-background-color: var(--danger);
  --v-button-background-color-hover: var(--danger-125);
  --v-button-color: var(--danger-alt);
  --v-button-color-hover: var(--danger-alt);
}

.v-form {
  padding-top: calc(var(--form-vertical-gap));
  --v-list-item-content-padding: 0px 0;
  --v-image-display: none;
}

.v-form.in-drawer {
  padding-left: var(--form-horizontal-gap);
}
div.interface {
  display: none;
}
.image-half-crop {
  display: none;
}

@media (max-width: 959px) {
  .v-form.in-drawer {
    padding-right: var(--form-horizontal-gap);
  }
  /* #inputval {
    display: none;
  } */
}
</style>

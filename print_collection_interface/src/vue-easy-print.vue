<template>
  <div>
    <div v-show="tableShow" ref="template" media="print">
      <slot> </slot>
    </div>
    <!--The button here is a bit lazy and directly uses the css name of element-ui. -->
  </div>
</template>

<script>
export default {
  name: "vue-easy-print",
  components: {},
  props: {
    // For paginated table mode: insert blank row at the end
    spaceRow: {
      type: Boolean,
      default: false,
    },

    // For paginated table mode: incoming print data.
    tableData: {
      type: Object,
      default() {
        return undefined;
      },
    },
    // whether to show the table
    tableShow: {
      type: Boolean,
      default: false,
    },
    // Whether to show the default print button
    buttonShow: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: "el-button el-button--default",
    },
    // how many lines per page
    onePageRow: {
      type: Number,
      default: 5,
    },
    customCss: {
      type: String,
      default: "easyPrint",
    },

    beforeCopy: Function,
    beforePrint: Function,
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let printI = document.getElementById("easyPrintIframe");
      if (!printI) {
        printI = document.createElement("iframe");
        printI.id = "easyPrintIframe";
        printI.style.position = "fixed";
        printI.style.width = "0px";
        printI.style.height = "0px";
        printI.style.top = "-100px";
        // printI.style.zIndex = "99";
        printI.style.backgroundColor = "white";

        // Compatible with ie
        if (
          window.location.hostname !== document.domain &&
          navigator.userAgent.match(/msie/i)
        ) {
          printI.src =
            'javascript:document.write("<head><script>document.domain=\\"' +
            document.domain +
            '\\";</s' +
            'cript></head><body></body>")';
        }
        printI.onload = () => {
          // this.getStyle();
        };

        document.body.appendChild(printI);
      } else {
        // this.getStyle();
      }
    },
    async print() {
      if (typeof this.beforeCopy === "function") {
        // function that needs to be executed before copying is detected this.beforeCopy();
      }
      this.swapInputToDiv();

      let $iframe = document.getElementById("easyPrintIframe");
      // Copy body, print content
      $iframe.contentDocument.body.innerHTML = this.$refs.template.innerHTML;
      // inject custom css
      $iframe.contentDocument.body.innerHTML =
        ` <style> ${this.customCss}</style>` +
        $iframe.contentDocument.body.innerHTML;

      if (typeof this.beforePrint === "function") {
        // Detect functions that need to be executed before printing
        // For example, some QR code components cannot directly copy DOM to complete.
      }

      // execute printing
      this.$nextTick(() => {
        setTimeout(() => {
          $iframe.contentWindow.print();
        }, 100);
        this.cleanSwapedInputs();
      });
      // init after print
      $iframe.contentWindow.addEventListener("afterprint", (event) => {
        // $iframe.contentDocument.body.innerHTML = "";
        // this.swapInputToDiv();
        // this.cleanSwapedInputs();
      });
    },
    cleanSwapedInputs() {
      var checkmyswap = document.querySelectorAll("p.swapinputval");

      for (let i = 0; i < checkmyswap.length; i++) {
        const e = checkmyswap[i];

        e.remove();
      }
    },

    swapInputToDiv() {
      var doc = document.getElementById("easyPrintIframe");
      var ifrmDoc = doc.contentDocument;

      // chek if already swaped inputs :remove

      var input = document.querySelectorAll(" input, textarea");
      console.log(input);

      for (var i = 0; i < input.length; i++) {
        var elem = ifrmDoc.createElement("p");
        var inp = input[i];

        elem.textContent = inp.value || "...";

        elem.className = `swapinputval`;
        input[i].after(elem);

        // inp.replaceWith(elem);

        // ifrDoc.body.appendChild(elem);
      }

      return true;
    },
    getStyle() {
      let printI = document.getElementById("easyPrintIframe");
      var str = "",
        styles1 = document.querySelectorAll("style");
      for (var i = 0; i < styles1.length; i++) {
        str += styles1[i].outerHTML;
        // console.log(styles1);
      }

      printI.contentDocument.head.innerHTML = str;

      // Add link to import

      let styles = document.querySelectorAll("link");
      for (let i = 0; i < styles.length; i++) {
        // Chrome is normal, firefox is not normal, it can be executed, but the addition has no results
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        if (styles[i].type) link.setAttribute("type", styles[i].type);
        else link.setAttribute("type", "text/css");
        link.setAttribute("href", styles[i].href);
        link.setAttribute("media", "all");
        printI.contentDocument.head.appendChild(link);
      }
    },
  },
};

const sss = ` 
@page {
        size: a5 portrait;
        margin: 0;
    }

@media screen {
 
}

@media print {
 
/* swaped input values to custom div*/
 .swapinputval {
 margin-top: 16pt;
 margin-bottom: 16pt;
 }
 

  .field-label,
  .v-button,
  .info,
  header,
  footer, .field-label,
  .v-button, input,
  textarea {
    display: none;
  }


  body {
    display: block;
    position: relative;
    margin: 15pt;
    font: 13pt Arial, Helvetica, sans-serif;
    line-height: 1.3;
    border: 3px solid #73AD21;
  
   
  }

  h1 {
    font-size: 24pt;
  }

  h2,
  h3,
  h4,
  p {
    font-size: 14pt;
  
  }

  img {
    margin-bottom: 16pt;
    width: 60pt;
    height: 60pt;
  }
  .render-template {
    display: flex;
    page-break-inside: avoid;
    text-align: center;
  }

  .render-template span {
    display: contents;
    page-break-inside: avoid;
    text-align: center;
  }

 

  ul {
    list-style-position: inside;
  }

  li {
    line-height: 1.5em;
    text-align: end;
    list-style: none;
    page-break-inside: avoid;

    
    list-style-type: square;
  }

 
 

  /* Adding custom messages before and after the content */
body:after {
  
display:block;
  position: absolute;
  bottom: 0;
  width: 100%;
 
  margin-left: auto;
    margin-right: auto;
   
  content: "\ footer section  (c)  ";
  color: #999 !important;
  font-size: 8pt;


   border: 3px solid #73AD21;
   text-align: center !important;
 
}

body:before {
  display: block;
  content: " Header text";
  color: #777 !important;
  font-size: 8pt;
  padding-top: 00px;
  text-align: center !important;
  
 }
}

`;
</script>

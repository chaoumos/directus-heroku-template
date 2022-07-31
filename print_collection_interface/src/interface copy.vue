<template>

	<div ref="pdfDom">
		<!-- 
		<input :value="value" @input="handleChange($event.target.value)" />
		<p>VALUE: {{ varx }}</p> -->
		<br>
		<input v-model="message" placeholder="edit me" /> @input="filter"
		<p>Message is: {{ message }}</p>


		<v-button v-on:click="logToConsole">Log collections to console</v-button>
		<v-button v-on:click="print">Print</v-button>
		<!-- <li v-for="n in filtredListcollections">{{ n.collection }}</li> -->
		<div>
			<p>Name: {{ name }}</p>
			<p>Collection: {{ collection }} ##</p>
			<li v-for="n in printFields">{{ n.meta }}</li>

		</div>

	</div>


</template>

<script>




export default {


	inheritAttrs: false,
	props: {

		collection: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			collections: null,
			varx: null,
			value: null,
			message: "",
			printFields: null
		}
	},
	computed: {
		filtredListcollections() {
			if (this.collections == null) {
				return
			} else {

				return this.collections.filter((item) => item.collection.match(this.message))
			}
		}
	},
	methods: {

		logToConsole: function () {
			console.log("_________logToConsole_____________");


			const { useFieldsStore } = this.stores;

			const myField = this.stores.useFieldsStore();

			console.log(this.stores);
			console.log(myField.getFieldsForCollection(this.collection));

			console.log("__end__________logToConsole__________");

			this.printFields = myField.getFieldsForCollection(this.collection)
		},
		handleChange: function (value) {
			console.log(value);
			this.value = value;
			// emit('input', value);
			this.varx = value;

		},
		print:  // Print dom The content of
			function () {


				// Get the Dom Content
				let newDomHtml = this.$refs.pdfDom.innerHTML;
				// What will be printed html Assign to this page
				window.document.body.innerHTML = newDomHtml;
				// call windos Print interface for
				window.print();
				window.location.reload(); // Solve the problem of button failure after printing , Refresh the page
				return false;
			},



	},
	inject: ['api', 'stores'],
	mounted() {
		// log the system field so you can see what attributes are available under it
		// remove this line when you're done.
		// console.log("##############################--");
		// console.log(this.api);
		// console.log(this.api.body);
		// console.log("##############################--");
		// console.log(this.stores);


		// Get a list of all available collections to use with this module
		this.api.get('/collections?limit=-1').then((res) => {
			this.collections = res.data.data;
		});

	},
};
</script>
<!-- <style>
@page {
	margin: 0;
	/* // Control is the use of a4 Or use other paper specifications */
	size: auto;
}
</style> -->
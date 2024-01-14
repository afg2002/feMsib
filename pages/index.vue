<template>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <div class="bg-gray-400 rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="start-date" class="block text-gray-700 mb-2">Start Date and Time:</label>
            <input type="datetime-local" id="start-date" class="border border-gray-300 rounded-md px-3 py-2 w-full" v-model="startDate" />
          </div>
          
          <div class="mb-4">
            <label for="end-date" class="block text-gray-700 mb-2">End Date and Time:</label>
            <input type="datetime-local" id="end-date" class="border border-gray-300 rounded-md px-3 py-2 w-full" v-model="endDate" />
          </div>

          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Preview</button>
            <button @click="downloadPdf" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Download</button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Preview PDF</h2>
        <iframe :src="pdfUrl" class="w-full h-96"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      pdfUrl: ''
    }
  },
  methods: {
    async handleSubmit() {
      // Convert start date to Unix timestamp
      // const startTimestamp = Math.floor(new Date(this.startDate).getTime() / 1000);
      
      // // Convert end date to Unix timestamp
      // const endTimestamp = Math.floor(new Date(this.endDate).getTime() / 1000);
      const startTimestamp = 1704769583000
      const endTimestamp = 1704769883000

      console.log(startTimestamp, endTimestamp);

      try {
        const token = useCookie('token');
        // Make a fetch API request to http://localhost:5000/ with the Unix timestamps
        const response = await fetch(`http://localhost:5000/generate-pdf/${startTimestamp}/${endTimestamp}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`,
            // Add other headers if needed
          },
        });

        // Check if the request was successful (status code 200-299)
        if (response.ok) {
          const data = await response.json();
          // Handle the response data as needed
          console.log(data);

          // Assuming the server returns a PDF URL in the response, update the iframe source
          this.pdfUrl = data.pdfUrl;
        } else {
          // Handle non-successful responses
          console.error('Error generating PDF:', response.statusText);
        }
      } catch (error) {
        // Handle errors
        console.error('Error generating PDF:', error);
      }
    },

    // ... (other methods) ...
  }
}
</script>

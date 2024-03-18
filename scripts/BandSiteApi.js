class BandSiteApi{
    constructor(apiKey){
      this.apiKey = apiKey;
      this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }
    
    async getComments(){
      try{
        const response = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);
        return response.data;
      }catch(err){
        console.log(err);
      }
    }

    async postComment(comment){
        try {
            const response = await axios.post(`${this.baseUrl}comments?api_key=${this.apiKey}`, comment)
            console.log(response.status);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async getShows(){
        try{
            const response = await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`);
            return response.data;
          }catch(err){
            console.log(err);
          }
    }
  
  }

  export default BandSiteApi;

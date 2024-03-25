class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }

  async getComments() {
    try {
      const response = await axios.get(
        `${this.baseUrl}comments?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (err) {
      console.log("Get comments error: ", err);
    }
  }

  async postComment(comment) {
    try {
      const response = await axios.post(
        `${this.baseUrl}comments?api_key=${this.apiKey}`,
        comment
      );
      console.log(response.status);
      return response.data;
    } catch (err) {
      console.log(("Post comment error: ", err));
    }
  }

  async deleteComment(id) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}comments/${id}?api_key=${this.apiKey}`
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.log("Delete comment error: ", error);
    }
  }

  async likeComment(id) {
    try {
      const response = await axios.put(
        `${this.baseUrl}comments/${id}/like?api_key=${this.apiKey}`
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.log("Like comment error: ", error);
    }
  }

  async getShows() {
    try {
      const response = await axios.get(
        `${this.baseUrl}showdates?api_key=${this.apiKey}`
      );
      return response.data;
    } catch (err) {
      console.log("Get shows error: ", error);
    }
  }
}

export default BandSiteApi;

import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

const RESTHEART_URL = process.env.RESTHEART_URL || "localhost:8080"

class BooksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://${RESTHEART_URL}/`;
    }
    willSendRequest(request: RequestOptions) {
        request.headers.set("Authorization", "Basic YWRtaW46c2VjcmV0")
    }
    async getBooks() {
        const ret = await this.get(`books/`);
        return ret;
    }
    async postBooks(books: any[]) {
        const ret = await this.post(
            "books",
            books
        )
        return ret;
    }
}

export default BooksAPI;
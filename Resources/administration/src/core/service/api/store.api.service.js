import ApiService from '../api.service';

/**
 * Gateway for the API end point "store"
 * @class
 * @extends ApiService
 */
class StoreApiService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'store') {
        super(httpClient, loginService, apiEndpoint);
        this.name = 'storeService';
    }

    login(shopwareId, password) {
        const headers = this.getBasicHeaders();

        return this.httpClient
            .post(`/_custom/${this.getApiBasePath()}/login`, { shopwareId, password }, { headers })
            .then((response) => {
                return ApiService.handleResponse(response);
            });
    }

    getLicenseList() {
        const headers = this.getBasicHeaders();

        return this.httpClient
            .get(`/_custom/${this.getApiBasePath()}/licenses`, { headers })
            .then((response) => {
                return ApiService.handleResponse(response);
            });
    }
}

export default StoreApiService;

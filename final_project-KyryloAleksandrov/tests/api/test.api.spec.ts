import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';
import { IncomesResponse } from 'src/dto/incomes.dto';
import { Config } from 'src/helpers/config.helper';
import { grabSessionCookie } from 'src/services/login-service';


describe('API test suite', function () {
    this.timeout(30000);

    let cookieHeader: string;

    before(async function () {
        this.timeout(30000);
        cookieHeader = await grabSessionCookie();
    });

    it('Should fetch the incomes map with a valid cookie after login', async () => {
        const url = `${Config.baseURL}api/incomes?`;
        const response: AxiosResponse<IncomesResponse> = await axios.get<IncomesResponse>(url, {
            headers: { Cookie: cookieHeader },
            validateStatus: () => true
        });

        expect(response.status).to.equal(200);
    });

    it('Should return success message when adding a new income', async () => {
        const newIncomePayload = Config.newIncomePayload;

        const postRes = await axios.post<string>(
            `${Config.baseURL}api/incomes/add`,
            newIncomePayload,
            {
                headers: { Cookie: cookieHeader },
                responseType: 'text',
                validateStatus: () => true
            }
        );

        // 1) correct status
        expect(postRes.status).to.be.oneOf([200, 201]);

        // 2) body matches exactly the pattern
        expect(postRes.data).to.match(
            /^Successfully created income ID: .+$/,
            'Response should be "Successfully created income ID: <some id>"'
        );
    });

    it('Should return success message when adding a new expense', async () => {
        const newExpensePayload = Config.newExpensePayload;

        const postRes = await axios.post<string>(
            `${Config.baseURL}api/expenses/add`,
            newExpensePayload,
            {
                headers: {
                    Cookie: cookieHeader,
                    'Content-Type': 'application/json'
                },
                responseType: 'text',
                validateStatus: () => true
            }
        );

        expect(postRes.status).to.be.oneOf([200, 201]);
        expect(postRes.data).to.match(
            /^Successfully created expense ID: .+$/,
            'Response must be "Successfully created expense ID: <some id>"'
        );
    });
});

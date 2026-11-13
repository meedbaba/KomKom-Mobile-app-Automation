import LoginPage from '../../pages/LoginPage.js';
import { credentials } from '../../test-data/credentials.js';
import { expect } from 'chai';

describe('Komkom Wallet - Login Tests', () => {

    beforeEach(async () => {
        await browser.activateApp('com.komkom');
        await LoginPage.loginHeading.waitForDisplayed({
            timeout: 15000
        });
    });

    // Test 1: Registered email with incorrect password
    it('should reject a registered email with an incorrect password', async () => {

        await LoginPage.login(
            credentials.invalidPassword.email,
            credentials.invalidPassword.password
        );

        await LoginPage.passwordError.waitForDisplayed({
            timeout: 10000
        });

        expect(await LoginPage.passwordError.getText())
            .to.equal('invalid password');
    });

    // Test 2: Unregistered email
    it('should reject an unregistered email', async () => {

        await LoginPage.login(
            credentials.unregistered.email,
            credentials.unregistered.password
        );

        await LoginPage.emailError.waitForDisplayed({
            timeout: 10000
        });

        expect(await LoginPage.emailError.getText())
            .to.equal('email address not found');
    });

    // Test 3: Successful login and dashboard loading
    it('should successfully log in and display the dashboard', async () => {

        // Assertion 1: Successful login
        await LoginPage.login(
            credentials.valid.email,
            credentials.valid.password
        );

        await LoginPage.totalCashBalance.waitForDisplayed({
            timeout: 20000
        });

        // Assertion 2: Dashboard is displayed
        expect(await LoginPage.totalCashBalance.getText())
            .to.equal('Total Cash Balance');

    });

});
class LoginPage {

    get emailInput() {
        return $('//*[@resource-id="email-input"]');
    }

    get passwordInput() {
        return $('//*[@resource-id="password-input"]');
    }

    get loginButton() {
        return $('//*[@resource-id="login-button"]');
    }

    get loginHeading() {
        return $('//*[@resource-id="form-title"]');
    }
	
    get passwordError() {
    return $('//*[@resource-id="password-input-error"]');
   }

   get emailError() {
    return $('//*[@resource-id="email-input-error"]');
   }
   get totalCashBalance() {
    return $('//*[@text="Total Cash Balance"]');
   }

    async enterEmail(email) {
        await this.emailInput.waitForDisplayed({ timeout: 10000 });
        await this.emailInput.setValue(email);
    }

    async enterPassword(password) {
        await this.passwordInput.waitForDisplayed({ timeout: 10000 });
        await this.passwordInput.setValue(password);
    }

    async clickLogin() {
        await this.loginButton.waitForDisplayed({ timeout: 10000 });
        await this.loginButton.click();
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

export default new LoginPage();
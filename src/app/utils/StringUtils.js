class StringUtils {
    isValidEmail(email) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }

    isValidDate(date) {
        return !isNaN(Date.parse(date));
    }

    isValidGender(gender) {
        return ['male', 'female', 'other'].includes(gender);
    }
}

module.exports = new StringUtils();

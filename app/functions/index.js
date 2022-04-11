module.exports = {
    isPalindrome: (text) => {
        let result = true;
        for(let i = 0; i < text.length/2; ++i) {
            result &= text.charAt(i) === text.charAt(text.length-1-i);
        }
        return result;
    }
}
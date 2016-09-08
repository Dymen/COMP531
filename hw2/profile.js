/**
 * Created by danye on 9/1/16.
 */
window.onload = function () {
    var displayIn = document.getElementById('displayIn')
    var display = document.getElementById('display')
    var emailIn = document.getElementById('emailIn')
    var email = document.getElementById('email')
    var passwordIn = document.getElementById('passwordIn')
    var password = document.getElementById('password')
    var zipcodeIn = document.getElementById('zipcodeIn')
    var zipcode = document.getElementById('zipcode')
    var phoneIn = document.getElementById('phoneIn')
    var phone = document.getElementById('phone')
    var pwConfirmIn = document.getElementById('pwConfirmIn')
    var pwConfirm = document.getElementById('pwConfirm')
    var updateBtn = document.getElementById('update')
    var returnBtn = document.getElementById('return')

    updateBtn.onclick = function() {
        var result = verifyInput()
        if (result)
            updateDisplay()
    }

    returnBtn.onclick = function() {
        window.location.href = 'main.html'
    }

    function verifyInput() {
        var updateInfo = 'The following fileds are updated:\n'
        if (displayIn.value != '')
            if (displayIn.value != display.value)
                updateInfo = updateInfo.concat('Display name\n')
        if (passwordIn.value != '') {
            if (pwConfirmIn.value != passwordIn.value) {
                window.alert("Password doesn't match.")
                return false
            }
            if (passwordIn.value != password.value)
                updateInfo = updateInfo.concat('Password\n')
        }
        if (emailIn.value != '') {
            if (!/[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+/.test(emailIn.value)) {
                window.alert("Incorrect email.")
                return false
            }
            if (emailIn.value != email.value)
                updateInfo = updateInfo.concat('Email\n')
        }
        if (zipcodeIn.value != '') {
            if (!/[0-9]{5}/.test(zipcodeIn.value)) {
                window.alert("Incorrect zipcode.")
                return false
            }
            if (zipcodeIn.value != zipcode.value)
                updateInfo = updateInfo.concat('Zipcode\n')
        }
        if (phoneIn.value != '') {
            if (!/[0-9]{10}/.test(phoneIn.value)) {
                window.alert("Incorrect phone number.")
                return false
            }
            if (phoneIn.value != phone.value)
                updateInfo = updateInfo.concat('Phone number\n')
        }
        window.alert(updateInfo)
        return true
    }

    function updateDisplay() {
        if (displayIn.value != '') {
            display.value = displayIn.value;
            display.innerHTML = displayIn.value;
        }
        if (emailIn.value != '') {
            email.innerHTML = emailIn.value;
            email.value = emailIn.value;
        }
        if (zipcodeIn.value != '') {
            zipcode.innerHTML = zipcodeIn.value;
            zipcode.value = zipcodeIn.value;
        }
        if (phoneIn.value != '') {
            phone.innerHTML = phoneIn.value;
            phone.value = phoneIn.value;
        }
        if (passwordIn.value != '') {
            pwConfirm.innerHTML = passwordIn.value;
            password.innerHTML = passwordIn.value;
            pwConfirm.value = passwordIn.value;
            password.value = passwordIn.value;
        }
    }
}
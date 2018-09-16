var swears = chrome.storage.sync.get(['num_swears'], function(result) {
  var newValue = result.num_swears;
  console.log(newValue);
});

// Render the PayPal button
window.onload = function() {
paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // Specify the style of the button

    style: {
        layout: 'vertical',  // horizontal | vertical
        size:   'medium',    // medium | large | responsive
        shape:  'rect',      // pill | rect
        color:  'gold'       // gold | blue | silver | black
    },

    // Specify allowed and disallowed funding sources
    //
    // Options:
    // - paypal.FUNDING.CARD
    // - paypal.FUNDING.CREDIT
    // - paypal.FUNDING.ELV

    funding: {
        allowed: [ paypal.FUNDING.CARD, paypal.FUNDING.CREDIT ],
        disallowed: [ ]
    },

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
        sandbox:    'AfzxtDnQv37HIFrsofPV0iNDE96VuusLvSYPmHlRnpwv3jUPAEiOuD7lxFXZuer3odkkUjxBN6QVa45V',
        production: 'AfzxtDnQv37HIFrsofPV0iNDE96VuusLvSYPmHlRnpwv3jUPAEiOuD7lxFXZuer3odkkUjxBN6QVa45V'
    },

    payment: function(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: '0.01', currency: 'USD' }
                    }
                ]
            }
        });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            window.alert('Payment Complete!');
            chrome.storage.sync.set({'sworeTooManyTimes': false, 'num_swears': 0}, function(){});
        });
    }

}, '#paypal-button-container');
};
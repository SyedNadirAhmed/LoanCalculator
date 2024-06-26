//Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

     e.preventDefault();
});


//Calculate Results
function calculateResults(e) {
  //UI vars
    const amount  = document.getElementById('amount');
    const interest  = document.getElementById('interest');
    const years  = document.getElementById('years');
    const monthlyPayment  = document.getElementById('monthly-payment');
    const totalPayment  = document.getElementById('total-payment');
    const totalInterest  = document.getElementById('total-interest');
    
    const principle =  parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value) * 12;
     
    //Calculate Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';
    }else {
        showError('Please Check Your Number...');
    }
}

//show error
function showError(error){
    //hide results
    document.getElementById('results').style.display = 'none';

    //hide loader
    document.getElementById('loading').style.display = 'none';

    //create div
    const errorDiv = document.createElement('div');

    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');



    //Add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
 
    //insert error befor heading
    card.insertBefore(errorDiv, heading);

    //Clear Error after 3s
    setTimeout(clearError, 3000);
}
//clear error
function clearError(){
    document.querySelector('.alert').remove();
}
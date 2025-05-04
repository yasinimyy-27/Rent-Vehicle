import  { useState } from 'react';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

export const PaymentMethodsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [cardType, setCardType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const detectCardType = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, '');
    
    // Basic card type detection based on IIN ranges
    if (/^4/.test(cleanNumber)) {
      return 'visa';
    } else if (/^5[1-5]/.test(cleanNumber)) {
      return 'mastercard';
    } else if (/^3[47]/.test(cleanNumber)) {
      return 'amex';
    } else if (/^6(?:011|5)/.test(cleanNumber)) {
      return 'discover';
    }
    
    return '';
  };

  const formatCardNumber = (value: string) => {
    const cleanValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const cardType = detectCardType(cleanValue);
    setCardType(cardType);

    // Format the card number
    let formattedValue = '';
    
    if (cardType === 'amex') {
      // Format for American Express: XXXX XXXXXX XXXXX
      for (let i = 0; i < cleanValue.length; i++) {
        if (i === 4 || i === 10) {
          formattedValue += ' ';
        }
        formattedValue += cleanValue[i];
      }
    } else {
      // Format for other cards: XXXX XXXX XXXX XXXX
      for (let i = 0; i < cleanValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += cleanValue[i];
      }
    }
    
    return formattedValue;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Maximum length check (19 including spaces)
    if (value.length <= 19) {
      const formattedValue = formatCardNumber(value);
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 4) {
      let formattedValue = value;
      
      if (value.length > 2) {
        formattedValue = value.slice(0, 2) + '/' + value.slice(2);
      }
      
      setExpiryDate(formattedValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Simple validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError('All fields are required');
      return;
    }
    
    if (cardNumber.replace(/\s+/g, '').length < 15) {
      setError('Invalid card number');
      return;
    }
    
    if (expiryDate.length !== 5) {
      setError('Invalid expiry date');
      return;
    }
    
    if (cvv.length < 3) {
      setError('Invalid CVV');
      return;
    }
    
    // In a real app, you would submit this to your payment processor
    setSuccess('Payment method added successfully!');
    
    // Reset form
    setTimeout(() => {
      setCardNumber('');
      setCardName('');
      setExpiryDate('');
      setCvv('');
      setSaveCard(false);
      setCardType('');
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6 flex items-start">
          <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="input w-full pl-10 pr-10"
              maxLength={19}
            />
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            {cardType && (
              <div className="absolute right-3 top-2">
                <div className={`h-7 w-10 rounded ${
                  cardType === 'visa' ? 'bg-blue-600' : 
                  cardType === 'mastercard' ? 'bg-red-600' : 
                  cardType === 'amex' ? 'bg-gray-600' : 
                  'bg-yellow-600'
                } flex items-center justify-center text-white text-xs font-bold`}>
                  {cardType === 'visa' && 'VISA'}
                  {cardType === 'mastercard' && 'MC'}
                  {cardType === 'amex' && 'AMEX'}
                  {cardType === 'discover' && 'DISC'}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="input w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              className="input w-full"
              maxLength={5}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  setCvv(value);
                }
              }}
              placeholder="123"
              className="input w-full"
              maxLength={4}
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            checked={saveCard}
            onChange={() => setSaveCard(!saveCard)}
            className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Save this card for future purchases
          </label>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="btn btn-accent w-full"
          >
            Add Payment Method
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>We accept the following payment methods:</p>
          <div className="flex justify-center space-x-2 mt-2">
            <div className="h-8 w-12 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
            <div className="h-8 w-12 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
            <div className="h-8 w-12 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">AMEX</div>
            <div className="h-8 w-12 bg-yellow-600 rounded flex items-center justify-center text-white text-xs font-bold">DISC</div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
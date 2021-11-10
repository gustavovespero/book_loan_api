(async () => {
    const database = require('./database');

    const Loan = require('./model/Loan');
    const User = require('./model/User');
    const Book = require('./model/Book');
    const Session = require('./model/Session');
    const Loan_Book = require('./model/Loan_Book');

    await database.sync();

})();

//{force: true}
// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//

(function(exports) {

    'use strict'
    var articles = [];
    var stats = {};
    var maxWords = 0;
    var maxWordsId = 0;

    function fetchHelper(url, type) {
        var badAccess = false
        articles = [];
        stats = {};
        maxWords = 0;
        maxWordsId = 0;

        return fetch(url)
            .then(r => (function() {
                if (! r.ok) {
                    badAccess = true
                    if (type == 0)
                        throw new Error('Bad access')
                    return null
                }
                else return r.json()
            })())
            .then(r => (function(jsonObj) {
                if (! badAccess) {
                    articles = jsonObj.articles
                    countHelper()
                }
                if (type <= 1)
                    return stats
                else if (type == 2)
                    return maxWordsId.toString()
            })(r))
    }

    function countHelper() {
        articles.forEach(function (article) {
            var words = article.text.split(' ')
            stats[article._id] = words.length
            if (maxWords < words.length) {
                maxWords = words.length
                maxWordsId = article._id
            }
        })
    }

    function countWords(url) {
        return fetchHelper(url, 0)
    }

    function countWordsSafe(url) {
        return fetchHelper(url, 1)
    }

    function getLargest(url) {
        return fetchHelper(url, 2)
    }

    exports.inclass = {
        author: 'Dan Ye',
        countWords, countWordsSafe, getLargest
    }

})(this);
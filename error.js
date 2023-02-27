class MainError extends Error {


    constructor(errorMessage) {
        super()

        this.name = this.constructor.name
        this.message = errorMessage

        if (this instanceof RequestError) {
            this.statusCode = 404
            this.type = 'cocktail'
        }
    }
}
class RequestError extends MainError { }
class CocktailError extends MainError { }


module.exports = { MainError, RequestError, CocktailError }
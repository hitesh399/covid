export const state = () => ({
    countries: []
})

export const mutations = {
    updateCountries(state, { data }) {
        state.countries = data
    }
}

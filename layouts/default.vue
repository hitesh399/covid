<template>
    <div>
        <header class="masthead text-center text-white">
            <div class="masthead-content">
                <div class="container">
                    <h1 class="masthead-heading mb-0">Most Affected Countries</h1>
                    <div class="table-responsive">
                        <table class="table table-dark table-striped">
                            <thead class="thead-light">
                                <tr>
                                    <th class="text-left">#</th>
                                    <th class="text-left">Country</th>
                                    <th class="text-right">Confimed</th>
                                    <th class="text-right">Recovered</th>
                                    <th class="text-right">Deaths</th>
                                    <!-- <th>Test Performed</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(country, i) in mostCountries" :key="`_ms${i}`">
                                    <td class="text-left">{{i+1}}</td>
                                    <td class="text-left">
                                        <a
                                            v-if="country.cities && country.cities.length"
                                            :href="`#${id(country.country)}_city`"
                                        >{{country.country}}</a>
                                        <span v-else>{{country.country}}</span>
                                    </td>
                                    <td class="text-right">{{country.confirmed.toLocaleString('en-IN', { maximumSignificantDigits: 3 })}}</td>
                                    <td
                                        class="text-right"
                                    >
                                    {{country.recovered ? country.recovered.toLocaleString('en-IN', { maximumSignificantDigits: 3 }): 'N/A' }}
                                    </td>
                                    <td
                                        class="text-right"
                                    >{{country.deaths? country.deaths.toLocaleString('en-IN', { maximumSignificantDigits: 3 }) : 'N/A'}}</td>
                                    <!-- <td>{{country.test_performed}}</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="bg-circle-1 bg-circle"></div>
            <div class="bg-circle-2 bg-circle"></div>
            <div class="bg-circle-3 bg-circle"></div>
            <div class="bg-circle-4 bg-circle"></div>
        </header>
        <nuxt></nuxt>
        <footer class="py-5 bg-black">
            <div class="container">
                <p
                    class="m-0 text-center text-white small"
                >Copyright &copy; coronavirusworld19 {{(new Date).getFullYear()}}</p>
            </div>
            <!-- /.container -->
        </footer>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    computed: {
        mostCountries() {
            return this.$store.state.countries.slice(0, 4);
        }
    },
    created() {
        this.loadData();
        setInterval(() => {
            this.loadData();
        }, 100000);
    },
    methods: {
        id(name) {
            return name.toString().replace(/ /g, '');
        },
        loadData() {
            // axios
            //     .get('/covid19.json', {
            //         headers: { 'Cache-Control': 'no-cache' }
            //     })
            //     .then(res => {
            //         this.$store.commit('updateCountries', { data: res.data });
            //     });

            axios
                .post('https://covid19-graphql.now.sh', {
                    query:
                        '{countries {name mostRecent { date(format: "dd/MMM/YYY") confirmed deaths recovered growthRate }}}'
                })
                .then(response => {
                    let countries = response.data.data.countries
                        .sort((a, b) => {
                            return a.mostRecent.confirmed >
                                b.mostRecent.confirmed
                                ? -1
                                : 1;
                        })
                        .map(v => {
                            return {
                                country: v.name,
                                confirmed: v.mostRecent.confirmed,
                                deaths: v.mostRecent.deaths,
                                recovered: v.mostRecent.recovered,
                                growthRate: v.mostRecent.growthRate
                            };
                        });
                    this.$store.commit('updateCountries', { data: countries });
                    // console.log('TEs', countries);
                    // console.log('Country', response.data.data.countries);
                });
        }
    }
};
</script>
</script>
<style>
/*!
 * Start Bootstrap - One Page Wonder v5.0.7 (https://startbootstrap.com/template-overviews/one-page-wonder)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-one-page-wonder/blob/master/LICENSE)
 */
h2 {
    margin: 28px 0;
}
body {
    font-family: 'Lato';
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Catamaran';
    font-weight: 800 !important;
}

.btn-xl {
    text-transform: uppercase;
    padding: 1.5rem 3rem;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
}

.bg-black {
    background-color: #000 !important;
}

.rounded-pill {
    border-radius: 5rem;
}

.navbar-custom {
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
}

.navbar-custom .navbar-brand {
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 700;
}

.navbar-custom .navbar-nav .nav-item .nav-link {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
}

header.masthead {
    position: relative;
    overflow: hidden;
    padding-top: calc(7rem + 72px);
    padding-bottom: 7rem;
    background: linear-gradient(0deg, #ff6a00 0%, #ee0979 100%);
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: scroll;
    background-size: cover;
}

header.masthead .masthead-content {
    z-index: 1;
    position: relative;
}

header.masthead .masthead-content .masthead-heading {
    font-size: 4rem;
}

header.masthead .masthead-content .masthead-subheading {
    font-size: 2rem;
}

header.masthead .bg-circle {
    z-index: 0;
    position: absolute;
    border-radius: 100%;
    background: linear-gradient(0deg, #ee0979 0%, #ff6a00 100%);
}

header.masthead .bg-circle-1 {
    height: 90rem;
    width: 90rem;
    bottom: -55rem;
    left: -55rem;
}

header.masthead .bg-circle-2 {
    height: 50rem;
    width: 50rem;
    top: -25rem;
    right: -25rem;
}

header.masthead .bg-circle-3 {
    height: 20rem;
    width: 20rem;
    bottom: -10rem;
    right: 5%;
}

header.masthead .bg-circle-4 {
    height: 30rem;
    width: 30rem;
    top: -5rem;
    right: 35%;
}

@media (min-width: 992px) {
    header.masthead {
        padding-top: calc(10rem + 55px);
        padding-bottom: 10rem;
    }
    header.masthead .masthead-content .masthead-heading {
        font-size: 6rem;
    }
    header.masthead .masthead-content .masthead-subheading {
        font-size: 4rem;
    }
}

.bg-primary {
    background-color: #ee0979 !important;
}

.btn-primary {
    background-color: #ee0979;
    border-color: #ee0979;
}

.btn-primary:active,
.btn-primary:focus,
.btn-primary:hover {
    background-color: #bd0760 !important;
    border-color: #bd0760 !important;
}

.btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(238, 9, 121, 0.5);
}

.btn-secondary {
    background-color: #ff6a00;
    border-color: #ff6a00;
}

.btn-secondary:active,
.btn-secondary:focus,
.btn-secondary:hover {
    background-color: #cc5500 !important;
    border-color: #cc5500 !important;
}

.btn-secondary:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 106, 0, 0.5);
}
</style>

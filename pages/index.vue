<template>
    <div>
        <section>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <h2>All Countries's Data</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="thead-dark">
                                    <tr>
                                        <th class="text-left">#</th>
                                        <th class="text-left">Country</th>
                                        <th class="text-right">Confimed</th>
                                        <th class="text-right">Recovered</th>
                                        <th class="text-right">Deaths</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(country, i) in countries" :key="`_cs${i}`" :class="{
                                        'table-info': country.country === 'India'
                                    }">
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
                                        >{{country.recovered ? country.recovered.toLocaleString('en-IN', { maximumSignificantDigits: 3 }): 'N/A' }}</td>
                                        <td
                                            class="text-right"
                                        >{{country.deaths? country.deaths.toLocaleString('en-IN', { maximumSignificantDigits: 3 }) : 'N/A'}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- <section>
            <div
                class="container"
                v-for="(country, ci) in countries.filter(c => c.cities && c.cities.length)"
                :key="`_cc${country.country}`"
            >
                <div
                    class="row align-items-center"
                    v-if=" country.cities && country.cities.length"
                    :id="`${id(country.country)}_city`"
                >
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <h2>{{country.country}}'s Cities Data</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="thead-dark">
                                    <tr>
                                        <th class="text-left">#</th>
                                        <th class="text-left">City</th>
                                        <th class="text-right">Confimed</th>
                                        <th class="text-right">Deaths</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(city, i) in country.cities" :key="`_cs${i}`" >
                                        <td class="text-left">{{i+1}}</td>
                                        <td class="text-left">{{city.name}}</td>
                                        <td class="text-right">{{city.confirmed}}</td>
                                        <td class="text-right">{{city.deaths}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    computed: {
        countries() {
            return this.$store.state.countries;
        }
    },
    methods: {
        id(name) {
            return name.toString().replace(/ /g, '');
        }
    }
};
</script>

<style>
</style>

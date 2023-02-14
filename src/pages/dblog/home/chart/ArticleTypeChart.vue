<template>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip :showTitle="false" dataKey="item*percent" />
        <v-axis />
        <v-legend dataKey="item" />
        <v-pie position="percent" color="item" :v-style="pieStyle" />
        <v-coord type="theta" />
    </v-chart>
</template>
<script>
import { mapState } from 'vuex'
const DataSet = require('@antv/data-set');
import { listType } from "@/services/home";
import { keyReName } from "@/utils/ObjectUtil";

const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
}];

export default {
    data() {
        return {
            data: [],
            scale,
            height: 240,
            pieStyle: {
                stroke: "#fff",
                lineWidth: 1
            }
        }
    },
    mounted() {
        var _this = this;
        listType().then(({ data }) => {
            var _data = data.data;
            keyReName(_data, "name", "item");
            keyReName(_data, "value", "count");
            const sourceData = _data;
            const dv = new DataSet.View().source(sourceData);
            dv.transform({
                type: 'percent',
                field: 'count',
                dimension: 'item',
                as: 'percent'
            });
            _this.data = dv.rows;
        });
    },
    computed: {
        ...mapState('setting', ['pageMinHeight']),
        desc() {
            return "Hello"
        }
    }
}
</script>
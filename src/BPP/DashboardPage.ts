type c3DataArray = [string, ...c3.Primitive[]];

// eslint-disable-next-line no-unused-vars
export class DashboardPage {
    private _root: JQuery;
    private chart: c3.ChartAPI;

    /** Customize static HTML here */
    private getDashboardDOM(): JQuery {
        return $(`
    <div class="panel-body-v-scroll fillHeight"> 
        <div class="panel-body">
          <div id="historyPieChart" class="chart"></div>
        </div>
    </div>
    `);
    }

    private createChart() {

        /** STEP 1: hello world */
        $("#historyPieChart", this._root).html("hello world");

        /** STEP 2: remove the line above and uncomment this:
         * 
         *
        let that = this;
        let dates: c3DataArray = ['x'];  // "x", "YYYY-MM-DD", ...
        let changes: c3DataArray = ["changes"];  // "changes", n1, n2, ...

        let param = {
            include: matrixApi.globalMatrix.historyFilter
        };
        matrixApi.restConnection.getProject("calendar" + "?" + $.param(param, true)).done(
            function (result: matrixApi.XRGetProject_Calendar_CalendarTypeList) {
                for (let entry of result) {
                    dates.push(entry.dateString);
                    changes.push(entry.nbChanges);
                }
                that.initializeChart(dates, changes);
            });
        */
    }


    private initializeChart(dates: c3DataArray, changes: c3DataArray) {
        const columns = [dates, changes];
        this.chart = c3.generate({
            bindto: $("#historyPieChart", this._root)[0],
            data: {
                x: 'x',
                columns: columns,
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            }
        });
    }

    /** Add interactive element in this function */
    renderProjectPage() {
        let that = this;
        that._root = that.getDashboardDOM();
        that.createChart();
        matrixApi.app.itemForm.append(
            matrixApi.ml.UI.getPageTitle(
                "All changes by date",
                () => {
                    return that._root;
                },
                () => {
                    that.onResize();
                }
            )
        );
        matrixApi.app.itemForm.append(this._root);
    }

    onResize() {
        /* Will be triggered when resizing. */
        this.chart.show();
    }
}

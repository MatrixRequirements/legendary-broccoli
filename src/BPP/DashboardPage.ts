import { IProjectSettings } from "./Interfaces";
import { Plugin } from "./Main";

// eslint-disable-next-line no-unused-vars
export class DashboardPage {
    settings: IProjectSettings;

    constructor() {
        this.settings = { ...Plugin.config.projectSettingsPage.defaultSettings, ...matrixApi.globalMatrix.ItemConfig.getSettingJSON(Plugin.config.projectSettingsPage.settingName, {}) };
    }

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
        let that = this;
        let dates: [string, ...c3.Primitive[]] = ['x'];  // "x", "YYYY-MM-DD", ...
        let changes: [string, ...c3.Primitive[]] = ["changes"];  // "changes", n1, n2, ...

        let param = {
            include: matrixApi.globalMatrix.historyFilter
        };
        matrixApi.restConnection.getProject("calendar" + "?" + $.param(param, true)).done(
            function (result: matrixApi.XRGetProject_Calendar_CalendarTypeList) {
                result.forEach((entry: matrixApi.XRCalendarType) => {
                    dates.push(entry.dateString);
                    changes.push(entry.nbChanges);
                });
                that.initializeChart(dates, changes);
            });
    }

    private _root: JQuery;
    private chart: c3.ChartAPI;

    private initializeChart(dates: [string, ...c3.Primitive[]], changes: [string, ...c3.Primitive[]]) {
        let that = this;
        const columns = [dates, changes];
        that.chart = c3.generate({
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

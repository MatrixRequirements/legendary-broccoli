/// <reference types="matrixrequirements-type-declarations" />
/// <reference types="matrix-requirements-api" />

import { DashboardPage } from "./DashboardPage";

/** This class is allows you to configure the features of your plugin.
 * 
 *  You can also implement functions to into the plugin (at start in the constructor, when loading a project, when loading an item)
 * 
     */
export class Plugin implements matrixApi.IExternalPlugin {

    core: matrixApi.PluginCore;

    /**This part enables which 
     * 
     * See IPluginConfig interface for explanation of parameters
    */
    
    static config: matrixApi.IPluginConfig = {
        /*  Page in admin client to configure settings across all projects - set enabled to false if not needed. 
            The page itself is implemented in the _ServerSettingsPage.ts 
        */
        customerSettingsPage: {
            id: "",
            title: "",
            type: "",
            enabled: false,
            settingName: "",
        },
        /*  Page in admin client to configure settings for one specific project - set enabled to false if not needed.
            The page itself is implemented in the _ProjectSetingsPage.ts 
        */
        projectSettingsPage: {
            id: "",
            title: "",
            type: "",
            enabled: false,
            settingName: "",
        },
        /*  Add an entry in the tool menu of an item or folder - set enabled to false if not needed.
            The tool itself is implemented in the _Tool.ts 
        */
        menuToolItem: {
            enabled: false,
            title: "",
        },
        /*  Add a custom field to enter some data in the UI - set enabled to false if not needed.
            The field itself is implemented in the _Control.ts 
        */
        field: {
            enabled: false,
            fieldType: "",
            fieldConfigOptions: {
                id: "",
                capabilities: {
                    canBePublished: false,
                    canBeReadonly: true,
                    canBeXtcPreset: false,
                    canHideInDoc: false,
                    canBeUsedInDocs: false,
                    canRequireContent: true,
                },
                class: "",
                help: "",
                label: "",
            }
        },
        /*  Add a dashboard inside a project - set enabled to false if not needed.
            The field itself is implemented in the _Control.ts 
        */
        dashboard: {        
            id: "CHANGE_VISUALIZATION",
            title: "Changes Dashboard Page",
            enabled: true,
            icon: "fal fa-cog",
            parent: "DASHBOARDS",
            usefilter: true,
            order: 9999,
        }
    };

    /**
     * The constructor is loaded once after all the source code is loaded by the browser. 
     * Nothing is known about the instance, project, user etc.
     * You can use it to initialize things like callbacks after item changes
     */
    constructor() {
        // here is a good place to register callbacks for UI events (like displaying or saving items)
        this.core = new matrixApi.PluginCore(this);
    }

    PLUGIN_VERSION: string;
    PLUGIN_NAME: string;
    getDashboard(): matrixApi.IDashboardPage {
        return new DashboardPage();
    }
    getProjectSettingsPage(): matrixApi.IPluginSettingPage<matrixApi.IProjectSettingsBase> {
        return null;
    }
    getServerSettingsPage(): matrixApi.IPluginSettingPage<matrixApi.IServerSettingsBase> {
        return null;
    }
    getControl(ctrlObj: JQuery): matrixApi.ControlCoreBase {
        return null;
    }
    getTool(): matrixApi.ITool {
        return null;
    }
    getConfig(): matrixApi.IPluginConfig {
        return Plugin.config;
    }
    enableToolMenu(ul: JQuery, _hook: number): boolean {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onInitProject(project: string) { }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onInitItem(item: matrixApi.IItem) { }
}

declare global {
    
    // eslint-disable-next-line no-unused-vars
    interface Window {
        plugins: unknown;
    }
}

$(() => {
    // Register the plugin
    $(function () {
        if (matrixApi.plugins["register"] != undefined) {
            matrixApi.plugins.register(new Plugin().core);
        }
    });
});

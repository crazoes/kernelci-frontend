/*!
 * Copyright (C) Collabora Limited 2020
 * Author: Alexandra Pereira <alexandra.pereira@collabora.com>
 *
 * Copyright (C) Linaro Limited 2015,2016,2017,2019
 * Author: Matt Hart <matthew.hart@linaro.org>
 * Author: Milo Casagrande <milo.casagrande@linaro.org>
 *
 * Copyright (C) Collabora Limited 2018
 * Author: Ana Guerrero Lopez <ana.guerrero@collabora.com>
 *
 * Copyright (C) Foundries.io 2018
 * Author: Milo Casagrande <milo@opensourcefoundries.com>
 *
 * Copyright (C) Baylibre 2017
 * Author: lollivier <lollivier@baylibre.com>
 *
 * kernelci dashboard.
 *
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */
require.config({
    paths: {
        'lib': './lib',
        'app': './app',
        'charts': './app/charts',
        'utils': './app/utils',
        'compare': './app/compare',
        'tables': './app/tables',
        'buttons': './app/buttons',
        'components': './app/components',
        'jquery': 'lib/jquery-2.2.1',
        'jquery.hotkeys': 'lib/jquery.hotkeys-1.0.min',
        'jquery.hotkeymap': 'lib/jquery.hotkeymap-1.0.min',
        'bootstrap': 'lib/bootstrap-3.3.6',
        'sprintf': 'lib/sprintf-1.0.3',
        'd3': 'lib/d3-3.5.16',
        'datatables.net': 'lib/jquery.dataTables-1.10.11',
        'datatables.bootstrap': 'lib/dataTables.bootstrap-1.10.11',
        'URI': 'lib/URI-1.18.9',
        'punycode': 'lib/punycode-1.18.9',
        'IPv6': 'lib/IPv6-1.18.9',
        'SecondLevelDomains': 'lib/SecondLevelDomains-1.18.9'
    },
    map: {
        '*': {
            'app/view-builds-all': 'app/view-builds-all.2017.5',
            'app/view-builds-id': 'app/view-builds-id.2020.10.1',
            'app/view-builds-job-branch-kernel': 'app/view-builds-job-branch-kernel.2021.05',
            'app/view-builds-job-kernel': 'app/view-builds-job-kernel.2020.6',
            'app/view-builds-job-kernel-defconfig': 'app/view-builds-job-kernel-defconfig.2017.3.3',
            'app/view-builds-job-kernel-defconfig-logs': 'app/view-builds-job-kernel-defconfig-logs.2020.6',
            'app/view-index': 'app/view-index.2017.3.3',
            'app/view-jobs-all': 'app/view-jobs-all.2020.10',
            'app/view-jobs-job': 'app/view-jobs-job.2020.10',
            'app/view-jobs-job-branch': 'app/view-jobs-job-branch.2020.10',
            'app/view-socs-all': 'app/view-socs-all.2020.10',
            'app/view-socs-soc': 'app/view-socs-soc.2020.10',
            'app/view-socs-soc-job': 'app/view-socs-soc-job.2020.10',
            'app/view-socs-soc-job-kernel': 'app/view-socs-soc-job-kernel.2020.10',
            'app/view-socs-soc-job-kernel-plan': 'app/view-socs-soc-job-kernel-plan.2020.10',
            'app/view-tests-all': 'app/view-tests-all.2020.9',
            'app/view-tests-plan-id': 'app/view-tests-plan-id.2020.10',
            'app/view-tests-case-id': 'app/view-tests-case-id.2020.10',
            'app/view-tests-job-branch-kernel': 'app/view-tests-job-branch-kernel.2020.10',
            'app/view-tests-job-branch-kernel-plan': 'app/view-tests-job-branch-kernel-plan.2020.10',
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'datatables.bootstrap': {
            deps: ['datatables.net']
        },
        'jquery.hotkeys': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'jquery.hotkeymap': {
            deps: ['jquery.hotkeys']
        }
    }
});

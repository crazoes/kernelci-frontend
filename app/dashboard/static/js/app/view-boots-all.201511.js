/*! Kernel CI Dashboard | Licensed under the GNU GPL v3 (or later) */
require([
    'jquery',
    'utils/init',
    'utils/error',
    'utils/request',
    'utils/tables',
    'utils/html',
    'utils/const',
    'tables/boot'
], function($, init, e, r, t, html, appconst, boot) {
    'use strict';
    var gBootReqData,
        gBootsTable,
        gDateRange,
        gPageLen,
        gSearchFilter;

    document.getElementById('li-boot').setAttribute('class', 'active');

    gSearchFilter = null;
    gPageLen = null;
    gDateRange = appconst.MAX_DATE_RANGE;

    /**
     * Update the table with the new data.
     *
     * @param {object} response: The response from the previous request.
    **/
    function getMoreBootsDone(response) {
        var results;

        results = response.result;
        if (results.length > 0) {
            gBootsTable.addRows(results);
        }

        // Remove the loading banner when we get the last response.
        // Not the best solution since the last real response might come
        // before other requests depending on API time.
        if ((response.skip + response.limit) >= response.count) {
            html.removeChildrenByClass('table-process');
        }
    }

    /**
     * Get the other remaining boot reports.
     * Triggered after the initial get request.
     *
     * @param {object} response: The response from the previous request.
    **/
    function getMoreBoots(response) {
        var deferred,
            iNode,
            idx,
            resTotal,
            spanNode,
            totalReq;

        resTotal = response.count;
        if (response.result.length < resTotal) {
            // Add a small loading banner while we load more results.
            spanNode = document.createElement('span');

            iNode = document.createElement('i');
            iNode.className = 'fa fa-cog fa-spin';

            spanNode.appendChild(iNode);
            spanNode.insertAdjacentHTML('beforeend', '&nbsp;');
            spanNode.appendChild(
                document.createTextNode('loading more results'));
            spanNode.insertAdjacentHTML('beforeend', '&#8230;');

            html.replaceByClassNode('table-process', spanNode);

            totalReq = Math.floor(resTotal / appconst.MAX_QUERY_LIMIT);

            // Starting at 1 since we already got the first batch of results.
            for (idx = 1; idx <= totalReq; idx = idx + 1) {
                gBootReqData.skip = appconst.MAX_QUERY_LIMIT * idx;
                deferred = r.get('/_ajax/boot', gBootReqData);
                $.when(deferred)
                    .done(getMoreBootsDone);
            }
        }
    }

    function getBootsFail() {
        html.replaceContent(
            document.getElementById('table-loading'),
            html.errorDiv('Error loading data.'));
    }

    function getBootsDone(response) {
        var columns,
            results,
            rowURL;

        results = response.result;
        if (results.length === 0) {
            html.replaceContent(
                document.getElementById('table-div'),
                html.errorDiv('No boots data available.'));
        } else {
            rowURL = '/boot/%(board)s/job/%(job)s/kernel/%(kernel)s' +
                '/defconfig/%(defconfig_full)s/lab/%(lab_name)s/';

            columns = [
                {
                    data: '_id',
                    visible: false,
                    searchable: false,
                    orderable: false
                },
                {
                    data: 'job',
                    title: 'Tree',
                    type: 'string',
                    className: 'tree-column',
                    render: boot.renderTableTreeAll
                },
                {
                    data: 'git_branch',
                    title: 'Branch',
                    className: 'branch-column'
                },
                {
                    data: 'kernel',
                    title: 'Kernel',
                    type: 'string',
                    className: 'kernel-column',
                    render: boot.renderTableKernel
                },
                {
                    data: 'board',
                    title: 'Board Model',
                    type: 'string',
                    className: 'board-column',
                    render: boot.renderTableBoard
                },
                {
                    data: 'defconfig_full',
                    title: 'Defconfig',
                    className: 'defconfig-column',
                    render: boot.renderTableDefconfig
                },
                {
                    data: 'arch',
                    title: 'Arch.',
                    className: 'arch-column'
                },
                {
                    data: 'lab_name',
                    title: 'Lab Name',
                    className: 'lab-column'
                },
                {
                    data: 'created_on',
                    title: 'Date',
                    type: 'date',
                    className: 'date-column pull-center',
                    render: boot.renderTableDate
                },
                {
                    data: 'status',
                    title: 'Status',
                    type: 'string',
                    className: 'pull-center',
                    render: boot.renderTableStatus
                },
                {
                    data: 'board',
                    title: '',
                    orderable: false,
                    searchable: false,
                    width: '30px',
                    className: 'pull-center',
                    render: boot.renderTableDetail
                }
            ];

            gBootsTable
                .tableData(results)
                .columns(columns)
                .order([8, 'desc'])
                .menu('boot reports per page')
                .rowURL(rowURL)
                .rowURLElements(
                    ['board', 'job', 'kernel', 'defconfig_full', 'lab_name']
                )
                .draw();

            gBootsTable
                .pageLen(gPageLen)
                .search(gSearchFilter);
        }
    }

    function getBoots() {
        var deferred;

        deferred = r.get('/_ajax/boot', gBootReqData);
        $.when(deferred)
            .fail(e.error, getBootsFail)
            .done(getBootsDone, getMoreBoots);
    }

    init.hotkeys();
    init.tooltip();

    if (document.getElementById('search-filter') !== null) {
        gSearchFilter = document.getElementById('search-filter').value;
    }
    if (document.getElementById('page-len') !== null) {
        gPageLen = document.getElementById('page-len').value;
    }
    if (document.getElementById('date-range') !== null) {
        gDateRange = document.getElementById('date-range').value;
    }

    // Hold the data for the boot request. Global since it can be reused.
    gBootReqData = {
        date_range: gDateRange,
        limit: appconst.MAX_QUERY_LIMIT,
        sort: 'created_on',
        sort_order: -1
    };

    gBootsTable = t(['bootstable', 'table-loading', 'table-div'], true);
    getBoots();
});
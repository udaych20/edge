private getLocationTableColumnData(): DataTableColumn[] {
  this.locationTableColumn = [
    {
      field: 'childName',
      header: 'Child',
      width: 150,
      handleClick: true,
      url: '#',
      urlParams: [''],
      isHidden: false
    },
    {
      field: 'locAtClosure',
      header: 'Location at Stage Closure',
      width: 200,
      isHidden: false
    },
    {
      field: 'placementDecisionAuth',
      header: 'Placement Decision Authority',
      width: 200,
      isHidden: false
    },
    {
      field: 'cdChapter',
      header: 'Chapter 34 Agreement / Chapter 35 Order',
      width: 200,
      isHidden: !this.isIncomeSectionVisible
    },
    {
      field: 'agreementStartDate',
      header: 'Agreement / Order Start Date',
      width: 200,
      isDate: true,
      isHidden: !this.isIncomeSectionVisible
    },
    {
      field: 'agreementEndDate',
      header: 'Agreement / Order End Date',
      width: 200,
      isDate: true,
      isHidden: !this.isIncomeSectionVisible
    },
    {
      field: 'indAgreementContinue',
      header: 'Agreement / Order Will Continue After Stage Closure',
      width: 200,
      isHidden: !this.isIncomeSectionVisible
    }
  ];

  return this.locationTableColumn.filter(column => !column.isHidden);
}

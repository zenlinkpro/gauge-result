export class GaugeRewardsNotFoundError extends Error {
  name = 'GaugeRewardsNotFound'
  message = 'Gauge rewards not found'

  constructor(exactPeriodId: number) {
    super(
      `Cannot find gauge rewards from provided periodId ${exactPeriodId}`,
    )
  }
}

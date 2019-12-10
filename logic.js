/* global getAssetRegistry getFactory emit query */

/**
 * Hacer el seguimiento de la venta de un bien de un trader a otro
 * @param {org.example.trading.Trade} trade - la venta a ser procesada
 * @transaction
 */
async function tradeCommodity(trade) { // eslint-disable-line no-unused-vars

    // Asigna el nuevo dueño del bien
    trade.commodity.owner = trade.newOwner;
    const assetRegistry = await getAssetRegistry('org.example.trading.Commodity');

    // Emite una notificación de que ha ocurrido una venta/trade
    const tradeNotification = getFactory().newEvent('org.example.trading', 'TradeNotification');
    tradeNotification.commodity = trade.commodity;
    emit(tradeNotification);

    // persist the state of the commodity
    await assetRegistry.update(trade.commodity);
}

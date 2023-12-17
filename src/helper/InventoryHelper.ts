export class InventoryHelper {
    public static filterInventory(inventories: any[], inventoryId: any): any[] {
        return inventories.filter((item) => item.id === inventoryId);
    }
}

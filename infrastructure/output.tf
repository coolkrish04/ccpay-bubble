output "vaultUri" {
  value = "${data.azurerm_key_vault.ccpaybubble_key_vault.vault_uri}"
}

output "vaultName" {
  value = "${local.vaultName}"
}

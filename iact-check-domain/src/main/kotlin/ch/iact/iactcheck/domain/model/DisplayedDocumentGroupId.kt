package ch.iact.iactcheck.domain.model

import java.io.Serializable

data class DisplayedDocumentGroupId(
    val marketplaceTileConfigId: Long,
    val documentGroupId: Long
) : Serializable

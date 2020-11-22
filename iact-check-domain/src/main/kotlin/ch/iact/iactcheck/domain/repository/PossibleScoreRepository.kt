package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.PossibleScore
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PossibleScoreRepository : JpaRepository<PossibleScore, Long>
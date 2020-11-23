package ch.iact.iactcheck.domain.repository

import ch.iact.iactcheck.domain.model.PossibleOutcome
import org.springframework.data.jpa.repository.JpaRepository

interface PossibleOutcomeRepository : JpaRepository<PossibleOutcome, Long>
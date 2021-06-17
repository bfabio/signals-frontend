/* SPDX-License-Identifier: MPL-2.0 */
/* Copyright (C) 2021 Gemeente Amsterdam */
import type { FunctionComponent } from 'react'
import { ControlButton } from '@amsterdam/arm-core'
import { Close } from '@amsterdam/asc-assets'

interface MapCloseButtonProps {
  onClick: () => void
}

const MAP_ICON_SIZE = 44

const MapCloseButton: FunctionComponent<MapCloseButtonProps> = ({
  onClick,
}) => (
  <ControlButton
    data-testid="mapCloseButton"
    variant="blank"
    onClick={onClick}
    size={MAP_ICON_SIZE}
    title="Sluiten"
    icon={<Close />}
  />
)

export default MapCloseButton
